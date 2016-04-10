<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://v1-api.visioncloudapi.com/face/detection?api_id=c2caf169e9084f0b8bccf2b261ca1db0&api_secret=507944fa672b4496b4ae3545ae493b76&landmarks106=1&attributes=1",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
));

$file = $_FILES["file"];
$upload_file = './face.' . end((explode(".", $file['name'])));;
move_uploaded_file($file['tmp_name'], $upload_file);

$post = [
    "file" => new CURLFile(realpath($upload_file)),
];

curl_setopt($curl, CURLOPT_POSTFIELDS, $post); 

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
