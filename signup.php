<?php
session_start();
include("partials/connect.php");

// Handle signup form submission
$error = '';
$success = '';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $role = $_POST['role'];
    $full_name = trim($_POST['full_name']);

    if (empty($username) || empty($email) || empty($password) || empty($role) || empty($full_name)) {
        $error = 'Please fill in all fields.';
    } elseif (strlen($password) < 6) {
        $error = 'Password must be at least 6 characters long.';
    } else {
        // Check for duplicate email or username
        $check_query = "SELECT user_id FROM Users WHERE email = ? OR username = ?";
        $check_stmt = mysqli_prepare($con, $check_query);
        mysqli_stmt_bind_param($check_stmt, "ss", $email, $username);
        mysqli_stmt_execute($check_stmt);
        $result = mysqli_stmt_get_result($check_stmt);
        
        if (mysqli_num_rows($result) > 0) {
            $error = 'Email or username already exists.';
        } else {
            // Hash password
            $password_hash = password_hash($password, PASSWORD_DEFAULT);
            
            // Set boolean flags based on selected role
            $isAdmin = ($role == 'Admin') ? 1 : 0;
            $isBeneficiary = ($role == 'Beneficiary') ? 1 : 0;
            $isStaff = ($role == 'Staff') ? 1 : 0;
            
            // Insert new user with boolean roles
            $insert_query = "INSERT INTO Users (username, email, password_hash, isAdmin, isBeneficiary, isStaff, full_name) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = mysqli_prepare($con, $insert_query);
            mysqli_stmt_bind_param($stmt, "sssiiss", $username, $email, $password_hash, $isAdmin, $isBeneficiary, $isStaff, $full_name);
            
            if (mysqli_stmt_execute($stmt)) {
                $success = 'Account created successfully! Please sign in.';
                // Optionally redirect to signin.php after a delay
                // header('Location: signin.php');
                // exit();
            } else {
                $error = 'Error creating account. Please try again.';
            }
            mysqli_stmt_close($stmt);
        }
        mysqli_stmt_close($check_stmt);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jawaab Management Systems - Sign Up</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- External CSS -->
    <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
    <div class="login-card">
        <h2 class="text-center mb-4 login-title">Create Account - Jawaab</h2>
        <p class="text-center text-muted mb-4">Management Systems</p>
        <?php if ($error): ?>
            <div class="alert alert-danger" role="alert"><?php echo $error; ?></div>
        <?php endif; ?>
        <?php if ($success): ?>
            <div class="alert alert-success" role="alert"><?php echo $success; ?></div>
            <div class="text-center">
                <a href="signin.php" class="btn btn-success btn-signin">Sign In Now</a>
            </div>
        <?php else: ?>
            <form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" name="username" placeholder="Enter username" value="<?php echo isset($_POST['username']) ? htmlspecialchars($_POST['username']) : ''; ?>" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Enter email address" value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="Enter password (min 6 chars)" required>
                </div>
                <div class="mb-3">
                    <label for="role" class="form-label">Role</label>
                    <select class="form-select" id="role" name="role" required>
                        <option value="">Select Role</option>
                        <option value="Admin" <?php echo isset($_POST['role']) && $_POST['role'] == 'Admin' ? 'selected' : ''; ?>>Admin</option>
                        <option value="Staff" <?php echo isset($_POST['role']) && $_POST['role'] == 'Staff' ? 'selected' : ''; ?>>Staff</option>
                        
                        <option value="Beneficiary" <?php echo isset($_POST['role']) && $_POST['role'] == 'Beneficiary' ? 'selected' : ''; ?>>Beneficiary</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="full_name" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="full_name" name="full_name" placeholder="Enter full name" value="<?php echo isset($_POST['full_name']) ? htmlspecialchars($_POST['full_name']) : ''; ?>" required>
                </div>
                <button type="submit" class="btn btn-success btn-signin mb-3">Sign Up</button>
                <div class="text-center">
                    <a href="signin.php" class="signup-link">Already have an account? Sign In</a>
                </div>
            </form>
        <?php endif; ?>
    </div>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>