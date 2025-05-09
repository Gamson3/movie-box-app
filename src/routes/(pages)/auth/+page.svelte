<!-- src/routes/auth/+page.svelte  -->
<script lang="ts">
  import { register, login, loginWithGoogle } from '$lib/firebase/auth';
	import { auth } from '$lib/firebase/client';
	import { goto } from '$app/navigation';
	import { updateProfile } from 'firebase/auth';
  import { page } from '$app/state';
  import { onMount } from 'svelte';

  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let isLogin = true;
  let error: string | null = null;
  let loading = true;

  onMount(() => {
  	const signupParam = page.url.searchParams.get('signup');
  	if (signupParam === 'true') {
  		isLogin = false;
  	}
  });


  async function handleAuth() {

    function formatFirebaseError(code: string): string {
      switch (code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          return 'Incorrect email or password';
        case 'auth/email-already-in-use':
          return 'This email is already registered';
        case 'auth/weak-password':
          return 'Password should be at least 6 characters';
        default:
          return 'Something went wrong. Please try again';
      }
    }

    if (!email || !password) {
      error = 'Email, password and name are required';
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      error = 'Passwords do not match';
      return;
    }

    try {
      
		  if (isLogin) {
				await login(email, password);
			} else {
				const userCredential = await register(email, password);
				await updateProfile(userCredential.user, { displayName: name });
			}

			goto('/');

    } catch (err: any) {
      const errorCode = err.code ?? '';
      error = formatFirebaseError(errorCode)
      // alert('Authentication failed');
      console.error(err)
    }

  }
  async function handleGoogleLogin() {
		try {
			await loginWithGoogle();
			goto('/');
		} catch (error) {
			error = 'Google login failed';
			console.error(error);
		}
	}

  function toggleMode() {
    isLogin = !isLogin;
    email = '';
    password = '';
    confirmPassword = '';
    error = null;
  }
</script>

<section class="container mx-auto w-full px-32 py-8">
  
  <div class="max-w-md mx-auto my-10 bg-gray-800 p-6 rounded-lg text-white shadow-lg">
    <!-- {#if loading}
      <p class="text-center text-gray-400">Loading...</p> -->
    <!-- {:else if user}
      <div class="space-y-4 text-center">
        <p>You are logged in as <strong>{$user.email}</strong></p>
        <button
          on:click={logout}
          class="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
          Log Out
        </button>
      </div> -->
    <!-- {:else} -->
      <h2 class="text-2xl font-bold mb-4 text-center">{isLogin ? 'Log In' : 'Sign Up'}</h2>
      <form on:submit|preventDefault={handleAuth} class="space-y-4">
        {#if !isLogin}
        <input
          type="text"
          placeholder="Name"
          bind:value={name}
          class="w-full px-3 py-2 rounded bg-gray-700 text-white"
          required
        />
        {/if}
  
        <input
          type="email"
          placeholder="Email"
          bind:value={email}
          class="w-full px-3 py-2 rounded bg-gray-700 text-white"
          required
        />
  
        <input
          type="password"
          placeholder="Password"
          bind:value={password}
          class="w-full px-3 py-2 rounded bg-gray-700 text-white"
          required
        />
  
        {#if !isLogin}
          <input
            type="password"
            placeholder="Confirm Password"
            bind:value={confirmPassword}
            class="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
        {/if}
  
        {#if error}
          <p class="text-red-400">{error}</p>
        {/if}
  
        <button
          type="submit"
          class="w-full bg-blue-600 py-2 rounded transition cursor-pointer">
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
  
        <!-- <button type="button" 
          on:click={handleGoogleLogin} 
          class="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Continue with Google
        </button> -->
      </form>
  
      <div>
        <p class="text-gray-400 mt-4 text-sm text-center mx-auto">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            on:click={toggleMode} 
            class="text-blue-400 ml-1 cursor-pointer bg-transparent border-none p-0 hover:underline">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    <!-- {/if} -->
  </div>
  
</section>
