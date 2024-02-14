class UsersResponse {
  users = $state();
  error = $state();
  isLoading = $state(false);
}

export default function useFetchUsers () {
  const resp = new UsersResponse();

  async function fetchData() {
    resp.isLoading = true;
    try {
      const response = await fetch("https://randomuser.me/api/?results=3");
      resp.users = (await response.json()).results;
      resp.error = undefined;
    } catch (err) {
      resp.error = err;
      resp.users = undefined;
    }
    resp.isLoading = false;
  }

  fetchData();
  return resp;
}

// import fs from 'node:fs';

// export function getPackageVersion(packagePath) {
//   try {
//     // const nodePath = './node_modules/'
//     // const absolutePath = `${nodePath}${packagePath}`; 
  
//     const data = fs.readFileSync(packagePath
//       , 'utf-8');
//     const pkg = JSON.parse(data);
//     return pkg.version;
//   } catch (error) {
//     console.error(`Error reading package.json: ${error.message}`);
//     return null; // Or throw an error if preferred
//   }
// }

// export const SVELTEVERSION = getPackageVersion('./node_modules/svelte/package.json');

// export const SVELTEKITVERSION = getPackageVersion('./node_modules/svelte-kit/package.json')

