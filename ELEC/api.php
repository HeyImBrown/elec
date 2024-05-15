<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "blog";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM posts";
        $result = $conn->query($sql);
        $posts = [];
        while ($row = $result->fetch_assoc()) {
            $posts[] = $row;
        }
        echo json_encode($posts);
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $title = $data['title'];
        $content = $data['content'];
        $sql = "INSERT INTO posts (title, content) VALUES ('$title', '$content')";
        $conn->query($sql);
        break;
    case 'PUT':
        $id = $_GET['id'];
        $data = json_decode(file_get_contents('php://input'), true);
        $title = $data['title'];
        $content = $data['content'];
        $sql = "UPDATE posts SET title='$title', content='$content' WHERE id=$id";
        $conn->query($sql);
        break;
    case 'DELETE':
        $id = $_GET['id'];
        $sql = "DELETE FROM posts WHERE id=$id";
        $conn->query($sql);
        break;
}

$conn->close();
?>
