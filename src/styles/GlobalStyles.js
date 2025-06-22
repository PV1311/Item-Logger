import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;

  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;


  --color-red-700: #b91c1c;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);

  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-500);

  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
textarea{
  font: inherit;
  color: rgba(54, 54, 54, 0.75)
}

input[type="file"] {
  color: rgb(255, 255, 255);
}


button,
select {
  font: inherit;
  color: rgb(255, 255, 255);
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

a {
  color: inherit;
  text-decoration: none;
}



img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
`;

export default GlobalStyles;
