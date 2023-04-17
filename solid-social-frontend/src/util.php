<?php
namespace Util;

function esc(string $value){
  return htmlspecialchars($value);
}