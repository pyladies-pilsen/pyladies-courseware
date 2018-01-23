import React from 'react'
import { Container, Grid, Button, Breadcrumb } from 'semantic-ui-react'

import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/dist/light"
import hlPython from 'react-syntax-highlighter/dist/languages/python';
import hlStyle from 'react-syntax-highlighter/dist/styles/arduino-light';

registerLanguage('python', hlPython);

const sampleCode = `
def main():
    foo()
    bar()
`;

const reviewBoxStyle = {
  borderBottom: '1px dotted #333',
  marginBottom: 10,
  marginTop: 10,
};

export default class extends React.Component {

  render() {
    const { authorName, atHomeworkPage } = this.props;

    return (
      <div style={reviewBoxStyle}>
        {atHomeworkPage ? (
          <h3>{authorName}</h3>
        ) : (
          <Breadcrumb size='large' style={{ marginBottom: 16 }}>
            <Breadcrumb.Section style={{ fontWeight: 500 }}>
              Začátečnický kurz Pyladies Praha v CZ.NIC
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section style={{ fontWeight: 500 }}>
              5. Funkce & Řetězce
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section style={{ fontWeight: 500 }}>
              Domácí úkol 1
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section active as='h3'>
              {authorName}
            </Breadcrumb.Section>
          </Breadcrumb>
        )}
        <Grid columns={2}>
          <Grid.Column>
            <p>Řešení:</p>
            <SyntaxHighlighter language='python' style={hlStyle}>{sampleCode.trim()}</SyntaxHighlighter>
          </Grid.Column>
          <Grid.Column>
            <p>Feedback:</p>
            <Button
              compact
              size='small'
              color='blue'
              content='Přidat feedback'
            />
          </Grid.Column>
        </Grid>
      </div>
    );


  }

}
