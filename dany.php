<?php

$responseShown = false;

for ($i = 0; $i < 100; $i++) {
    $body = array(
        "api_key" => "c6de126b40d965c832a3f9e2a52fbcdc58edc947",
        "receiver" => "6288279044564",
        "data" => array("message" => "dany")
    );

    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://jpd.biz.id/api/send-message",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode($body),
        CURLOPT_HTTPHEADER => [
            "Accept: */*",
            "Content-Type: application/json",
        ],
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        $responseData = json_decode($response, true);

        if (!$responseShown && $responseData && isset($responseData['status']) && $responseData['status']) {
            echo "Sukses\n";
            $responseShown = true;
        }
    }
}

?>
