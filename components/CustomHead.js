import Head from 'next/head'

const globalCSS = `
pre {
  font-size: 12px;
}
`;

export default (props) => {
  const { title } = props;
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>{title && `${title} - `}Pyladies courseware</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&subset=latin-ext" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/codemirror.min.css" integrity="sha256-wluO/w4cnorJpS0JmcdTSYzwdb5E6u045qa4Ervfb1k=" crossorigin="anonymous" />
      <link rel="stylesheet" href="/static/main.css" />
      <style>{globalCSS}</style>
    </Head>
  );
};
