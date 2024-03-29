<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TP14.3 Sign Up Account</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="m-auto w-[50%] p-8 flex flex-col items-center shadow-2xl">
        <div class="text-[50px]"><strong>Sign up</strong></div>
        <div class="text-gray-400">It's free and only takes a minute.</div>
        <div class="w-full py-4">
            <label class="text-gray-400" for="Username">Username</label>
            <input class="w-full p-1 rounded-sm border-2 border-[#9ca3af]" type="text">
        </div>
        <div class="w-full">
            <label class="text-gray-400" for="Email">Email Address</label>
            <input class="w-full p-1 rounded-sm border-2 border-[#9ca3af]" type="text">
        </div>
        <div class="w-full py-4">
            <label class="text-gray-400" for="Password">Password</label>
            <input class="w-full p-1 rounded-sm border-2 border-[#9ca3af]" type="password">
        </div>
        <div class="w-full">
            <label class="text-gray-400" for="Password">Confirm Password</label>
            <input class="w-full p-1 rounded-sm border-2 border-[#9ca3af]" type="password">
        </div>
        <div class="w-full py-6">
            <button class="w-full bg-[#49c1a2] text-white p-1 rounded-sm" type="submit">Sign Up</button>
        </div>
        <div class="text-gray-400">By clicking the Sign Up button, you agree to our</div>
        <div class="text-[#49c1a2]">Terms & Conditions<span class="text-gray-400">, and </span>Privacy Policy.</div>
    </div>  
</body>
</html>