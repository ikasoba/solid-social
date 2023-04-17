<?php
  require_once "config.php";
  require_once "util.php";

  use function Util\esc;

  require_once "session.php";

  if ($_SERVER["REQUEST_METHOD"] == "POST"){
    if ($_POST["nonce"] != $_SESSION["nonce"]){
      header("Location: /new-post.php");
      exit();
    }
    file_get_contents(
      \Config\API_ORIGIN . "/v1/posts/create",
      false,
      stream_context_create([
        "http" => [
          "method" => "POST",
          "header" => implode("\r\n", [
            "Authorization: Basic " . base64_encode($_SESSION["user_id"] . ":" . $_SESSION["user_pass"]),
            "Content-Type: application/json"
          ]),
          "content" => json_encode([
            "content" => $_POST["content"]
          ])
        ]
      ])
    );
    header("Location: /home.php");
    exit();
  }

  $_SESSION["nonce"] = uniqid();
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Post</title>
  </head>
  <body>
    <form method="POST">
      <textarea name="content"></textarea><br/>
      <input name="nonce" type="hidden" value="<?= esc($_SESSION["nonce"]) ?>" />
      <input type="submit" value="publish" />
    </form>
  </body>
</html>