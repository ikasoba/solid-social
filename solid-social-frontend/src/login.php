<?php
  require_once "config.php";
  require_once "util.php";

  use function Util\esc;

  require_once "session.php";

  if ($_SERVER["REQUEST_METHOD"] == "POST"){
    if ($_POST["nonce"] != $_SESSION["nonce"]){
      header("Location: " . $_SERVER['REQUEST_URI']);
      exit();
    }
    $res = json_decode(
      file_get_contents(
        \Config\API_ORIGIN . "/v1/users?name=" . urlencode($_POST["username"]),
        false,
        stream_context_create([
          "http" => [
            "method" => "GET",
          ]
        ])
      ),
      true
    );

    $_SESSION["user_id"] = $res["id"];
    $_SESSION["user_pass"] = $_POST["password"];

    session_regenerate_id(true);

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
    <title>login</title>
  </head>
  <body>
    <form method="POST">
      <label>username: <input name="username" /></label><br/>
      <label>passowrd: <input name="password" /></label><br/>
      <input type="hidden" name="nonce" value="<?= esc($_SESSION["nonce"]) ?>" />
      <input type="submit" value="login" />
    </form>
  </body>
</html>