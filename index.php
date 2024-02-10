<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Online Website Builder</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/panel.css">
  <link rel="stylesheet" href="css/workspace.css">
</head>
<body>
    <?php include 'components/menu.php'; ?>
    <div class="container">
    <div id="element-panel-container">
      <?php include 'components/element-panel.php'; ?>
    </div>
    <div id="workspace-container">
      <?php include 'components/workspace.php'; ?>
    </div>
    <div id="property-panel-container">
      <?php include 'components/property-panel.php'; ?>
    </div>
  </div>
  <script src="js/script.js"></script>
</body>
</html>
