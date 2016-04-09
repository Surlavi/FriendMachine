<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://localhost:3000/gettone",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
));

$file = $_FILES["file"];
$upload_file = './wave.' . end((explode(".", $file['name'])));;
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
