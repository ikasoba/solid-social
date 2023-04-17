<?php
  require_once "config.php";
  require_once "util.php";

  use function Util\esc;

  require_once "session.php";

  if (!(isset($_SESSION["user_id"]) || isset($_SESSION["user_pass"]))){
    header("Location: /login.php");
    exit();
  }

  $user = json_decode(
    file_get_contents(
      \Config\API_ORIGIN . "/v1/users/" . $_SESSION["user_id"],
      false,
      stream_context_create([
        "http" => [
          "method" => "GET"
        ]
      ])
    ),
    true
  );

  $timeline = json_decode(
    file_get_contents(
      \Config\API_ORIGIN . "/v1/timeline",
      false,
      stream_context_create([
        "http" => [
          "method" => "GET",
          "header" => implode("\r\n", [
            "Authorization: Basic " . base64_encode($_SESSION["user_id"] . ":" . $_SESSION["user_pass"])
          ])
        ]
      ])
    ),
    true
  );
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>home</title>
  </head>
  <body>
    <header>
      current user: <?= esc($user["name"]) ?>
      <ul>
        <li>
          <a href="./new-post.php">
            create new post
          </a>
        </li>
      </ul>
    </header>
    <pre><?= esc(json_encode($user, JSON_PRETTY_PRINT)) ?></pre>
    <pre><?= esc(json_encode($timeline, JSON_PRETTY_PRINT)) ?></pre>
    <pre><?= esc(json_encode($_SESSION, JSON_PRETTY_PRINT)) ?></pre>
    <main>
      <?php foreach ($timeline as $item) {
        $timestamp = strtotime($item["createdAt"]);
        $datetime = date("c", $timestamp);
?>
        <article>
          <section>
            name: <?= esc($item["author"]["name"]) ?><br/>
            date: <time datetime="<?= esc($datetime) ?>"><?= esc(date("Y/m/d H:i:s", $timestamp)) ?></time>
          </section>
          <main><?= esc($item["content"]) ?></main>
        </article>
      <?php } ?>
    </main>
  </body>
</html>