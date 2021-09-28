import React, { Component } from "react";
import { Panel, FlexboxGrid } from "rsuite";
class LandingPage extends Component {
  render() {
    return (
      <FlexboxGrid justify="center">
        {" "}
        <Panel header="Panel title" bordered>
          {/* <Paragraph /> */}
        </Panel>
      </FlexboxGrid>
    );
  }
}

export default LandingPage;
