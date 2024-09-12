<?php
$update = json_decode(file_get_contents("php://input"), true);
$token = "7413876574:AAGl0CEujLtFAT0bQZk724O3ZV1w34BH-5Q";

function sendMessage($chatId, $text, $keyboard = null) {
    global $token;
    $url = "https://api.telegram.org/bot$token/sendMessage";

    $postFields = [
        'chat_id' => $chatId,
        'text' => $text,
        'reply_markup' => $keyboard
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    if ($response === false) {
        error_log('cURL Error: ' . curl_error($ch));
    }
    curl_close($ch);
}

function answerCallbackQuery($callbackId, $text) {
    global $token;
    $url = "https://api.telegram.org/bot$token/answerCallbackQuery";
    $postFields = [
        'callback_query_id' => $callbackId,
        'text' => $text,
        'show_alert' => false
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);
}

// Periksa apakah ini pesan teks
if (isset($update['message'])) {
    $chatId = $update['message']['chat']['id'];
    $text = $update['message']['text'];

    switch ($text) {
        case "/start":
            $keyboard = [
                'inline_keyboard' => [
                    [
                        ['text' => '📚 Materi', 'callback_data' => 'materi'],
                        ['text' => '📄 Soal', 'callback_data' => 'soal'],
                        ['text' => '📝 Latihan', 'callback_data' => 'latihan']
                    ]
                ]
            ];
            sendMessage($chatId, "Selamat datang di bot saya, silakan pilih keperluan kamu", json_encode($keyboard));
            break;
        case "/help":
            sendMessage($chatId, "Perintah yang tersedia:\n/start - Mulai bot\n/help - Bantuan");
            break;
        default:
            sendMessage($chatId, "Maaf, saya tidak mengerti perintah tersebut.");
            break;
    }
} elseif (isset($update['callback_query'])) {
    $callbackId = $update['callback_query']['id'];
    $chatId = $update['callback_query']['message']['chat']['id'];
    $callbackData = $update['callback_query']['data'];

    if ($callbackData == 'materi') {
        $keyboard = [
            'inline_keyboard' => [
                [
                    ['text' => '📜 Puisi', 'callback_data' => 'puisi'],
                    ['text' => '📖 Cerpen', 'callback_data' => 'cerpen'],
                    ['text' => '📰 Berita', 'callback_data' => 'berita']
                ],
                [
                    ['text' => '🎭 Pantun', 'callback_data' => 'pantun'],
                    ['text' => '📝 Eksposisi', 'callback_data' => 'eksposisi'],
                    ['text' => '🤝 Negosiasi', 'callback_data' => 'negosiasi']
                ],
                [
                    ['text' => 'Kembali', 'callback_data' => 'kembali']
                ]
            ]
        ];
        sendMessage($chatId, "Pilih materi yang Anda ingin ketahui lebih lanjut:", json_encode($keyboard));
        answerCallbackQuery($callbackId, "Menu Materi muncul");
    } elseif ($callbackData == 'kembali') {
        $keyboard = [
            'inline_keyboard' => [
                [
                    ['text' => '📚 Materi', 'callback_data' => 'materi'],
                    ['text' => '📄 Soal', 'callback_data' => 'soal'],
                    ['text' => '📝 Latihan', 'callback_data' => 'latihan']
                ]
            ]
        ];
        sendMessage($chatId, "Kembali ke menu utama:", json_encode($keyboard));
        answerCallbackQuery($callbackId, "Kembali ke menu utama");
    } else {
        $responses = [
            'puisi' => "Puisi adalah bentuk karya sastra yang mengungkapkan perasaan atau ide dengan bahasa yang indah dan terikat oleh ritme serta rima.",
            'cerpen' => "Cerpen adalah cerita pendek yang memiliki panjang antara 1.000 hingga 20.000 kata, biasanya berfokus pada satu kejadian penting.",
            'berita' => "Berita adalah laporan atau informasi tentang kejadian terbaru yang disampaikan melalui media massa.",
            'pantun' => "Pantun adalah puisi lama yang memiliki pola rima dan biasanya terdiri dari empat baris, dengan struktur a-b-a-b.",
            'eksposisi' => "Eksposisi adalah teks yang bertujuan untuk menjelaskan atau menerangkan suatu informasi atau topik dengan detail.",
            'negosiasi' => "Negosiasi adalah proses di mana dua pihak atau lebih berusaha untuk mencapai kesepakatan bersama mengenai suatu isu."
        ];

        if (isset($responses[$callbackData])) {
            sendMessage($chatId, $responses[$callbackData]);
        }
        answerCallbackQuery($callbackId, "Informasi tentang $callbackData");
    }
}
