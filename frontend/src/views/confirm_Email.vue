<template>
    <!-- testing pls give me ui for dis :(  -->
    <div> confirming your email... </div>
</template>

<script>

    console.log("confirm email script")
    
    export default {
        // Confirm.vue or in your script where you handle the confirmation
        mounted() {
        const urlParams = new URLSearchParams(window.location.hash.substr(1));
        const accessToken = urlParams.get('access_token');
        
        if (accessToken) {
            this.confirmEmail(accessToken);
        }
        },

        methods: {
        async confirmEmail(accessToken) {
            try {
            // Send access token to your backend to finalize registration
            const response = await fetch('/confirming-email', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                accessToken,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Registration successful, redirect user to the dashboard
                this.$router.push('/dashboard');
            } else {
                console.error('Error confirming registration:', data.message);
            }
            } catch (error) {
            console.error('Error confirming email:', error);
            }
        }
        }
    }
</script>