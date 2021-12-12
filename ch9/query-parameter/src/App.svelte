<script>
  import page from 'page';
  import qs from 'query-string';
  import Page1 from './Page1.svelte';
  import Page2 from './Page2.svelte';

  // This holds the page component to be rendered.
  let component;

  // This holds all the props to be passed to the page component.
  let props = {};

  /*
    This is a middleware function that parses query strings and puts the result
    back on the context object.
  */
  function parseQueryString(context, next) {
    context.query = qs.parse(context.querystring);
    // This clears the previous value.
    props = {};
    // This allows the next middleware to run.
    next();
  }

  /*
    This causes the parseQueryString middleware to run on every path.
    If the first parameter '*' is omitted, it will do the same thing.
  */
  page('*', parseQueryString);

  page('/', (context) => {
    component = Page1;
    props = { p1: 'alpha', q1: 'beta' };
  });

  /*
    This path requires the path parameter, p1, and accepts the optional
    path parameter, p2, indicated by following its name with a question mark.
    The associated component, Page1, also uses the query parameters q1 and q2,
    but there isn't a way to state in the path whether these are required or
    optional.
  */
  page('/one/:p1/:p2?', (context) => {
    component = Page1;
    const { params, query } = context;
    /*
      The path and query parameters are passed as props to the component
      to be rendered in <svelte:component> later.
    */
    props = { ...params, ...query };
  });

  // This path doesn't use any path or query parameters.
  page('/two', () => (component = Page2));

  page.start();
</script>

<nav>
  <!--
    Note how this link uses different path and query parameters than t
    he previous / " path, which sets p1 to "alpha" and q1 to "beta".
  -->
  <a class:active={component === Page1} href="/one/v1/v2?q1=v3&q2=v4"> One </a>
  <a class:active={component === Page2} href="/two">Two</a>
</nav>

<main>
  <!-- This is a special Svelte element that renders a given component. -->
  <svelte:component this={component} {...props} />
</main>

<style>
  /*
    These global CSS rules could instead be specified in public/global.css.
    This demonstrates an alternative way to define global styles.
   */
  :global(body) {
    padding: 0;
  }
  :global(h1) {
    margin-top: 0;
  }

  a {
    --padding: 0.5rem;
    background-color: white;
    border: solid gray 1px;
    border-radius: var(--padding);
    display: inline-block;
    margin-right: 1rem;
    padding: var(--padding);
    text-decoration: none;
  }

  .active {
    background-color: yellow;
  }

  main {
    padding: 1rem;
  }

  nav {
    background-color: cornflowerblue;
    padding: 1rem;
  }
</style>
