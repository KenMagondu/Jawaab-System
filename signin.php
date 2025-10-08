<?php
session_start();
include("partials/connect.php");

// Handle login form submission
$error = '';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        $error = 'Please fill in all fields.';
    } else {
        // Query the Users table using mysqli
        $query = "SELECT * FROM Users WHERE email = ?";
        $stmt = mysqli_prepare($con, $query);
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $user = mysqli_fetch_assoc($result);

        if ($user && password_verify($password, $user['password_hash'])) {
            // Determine role based on boolean flags
            $role = 'Unknown';
            if ($user['isAdmin'] == 1) {
                $role = 'Admin';
            } elseif ($user['isStaff'] == 1) {
                $role = 'Staff';
            } elseif ($user['isBeneficiary'] == 1) {
                $role = 'Beneficiary';
            }

            // Successful login
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $role;
            $_SESSION['full_name'] = $user['full_name'];

            // Redirect based on role (create respective dashboard files as needed)
            switch ($role) {
                case 'Admin':
                    header('Location: admin_dashboard.php');
                    break;
                case 'Staff':
                    header('Location: staff_dashboard.php');
                    break;
                case 'Beneficiary':
                    header('Location: beneficiary_dashboard.php');
                    break;
                default:
                    header('Location: dashboard.php'); // Fallback
            }
            exit();
        } else {
            $error = 'Invalid email or password.';
        }
        mysqli_stmt_close($stmt);
    }
}

// Optional: Comment out or remove auto-redirect if you want to access signin page when logged in
/*
// If already logged in, redirect to dashboard
if (isset($_SESSION['user_id'])) {
    // Redirect based on current session role
    $role = $_SESSION['role'] ?? 'Unknown';
    switch ($role) {
        case 'Admin':
            header('Location: admin_dashboard.php');
            break;
        case 'Staff':
            header('Location: staff_dashboard.php');
            break;
        case 'Beneficiary':
            header('Location: beneficiary_dashboard.php');
            break;
        default:
            header('Location: dashboard.php');
    }
    exit();
}
*/
?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jawaab Management Systems - Login</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- External CSS -->
    <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
    <div class="login-card">
        <h2 class="text-center mb-4 login-title">Welcome back to Jawaab</h2>
        <p class="text-center text-muted mb-4">Management Systems</p>
        
        <?php if (isset($_SESSION['user_id'])): ?>
            <div class="alert alert-info" role="alert">
                You are already logged in as <strong><?php echo htmlspecialchars($_SESSION['full_name'] ?? $_SESSION['email']); ?></strong> (<?php echo htmlspecialchars($_SESSION['role']); ?>)
                <br><br>
                <a href="logout.php" class="btn btn-warning btn-sm">Logout</a>
                <a href="<?php 
                    switch($_SESSION['role']) {
                        case 'Admin': echo 'admin_dashboard.php'; break;
                        case 'Staff': echo 'staff_dashboard.php'; break;
                        case 'Beneficiary': echo 'beneficiary_dashboard.php'; break;
                        default: echo 'dashboard.php';
                    }
                ?>" class="btn btn-primary btn-sm">Go to Dashboard</a>
            </div>
        <?php endif; ?>
        
        <?php if ($error): ?>
            <div class="alert alert-danger" role="alert"><?php echo $error; ?></div>
        <?php endif; ?>
        <form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
            <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="Enter email address" value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Enter password" required>
            </div>
            <button type="submit" class="btn btn-success btn-signin mb-3">Sign In</button>
            <div class="text-center">
                <a href="signup.php" class="signup-link">Need an account? Sign Up</a>
            </div>
        </form>
    </div>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>