const json = (r: Response) => r.json();

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch }) => {
  try {
    const SVELTEVERSION = await fetch('./node_modules/svelte/package.json').then(json);
    const SVERSION = SVELTEVERSION.version;
    return { SVERSION };
  } catch (error) {
    console.error(`Error in load function for /: ${error}`);
  }
};