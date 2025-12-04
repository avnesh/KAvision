<script src="https://cdn.tailwindcss.com"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        // Custom KA Vision Colors (Blue/Green Scheme based on Logo)
                        'primary': '#154483',        /* Dark Blue K shape */
                        'primary-dark': '#0f3261',
                        'accent': '#6EB53B',         /* Light Green Eye shape */
                        'accent-dark': '#558a2d',
                        'qa-dark': '#212529',        /* Near-black for main text */
                        'qa-light': '#F8F9FA',       /* Off-white for background */
                    },
                    fontFamily: {
                        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
                    },
                }
            }
        }
    </script>