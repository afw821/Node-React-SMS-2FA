import React, { Component } from "react";
import { Panel, FlexboxGrid, PanelGroup, Placeholder } from "rsuite";
class LandingPage extends Component {
  state = {
    showPlaceholder: false,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ showPlaceholder: false });
    }, 20000);
  }
  render() {
    const { user } = this.props;
    return (
      <FlexboxGrid justify="center">
        {" "}
        {/* <PanelGroup> */}
        <Panel
          className="panel-border"
          style={{ backgroundColor: "whitesmoke", width: "55%", height: "70%" }}
          header={<h3>{`Welcome, ${user.firstName}!`}</h3>}
          bordered
        >
          {this.state.showPlaceholder ? (
            <Placeholder.Paragraph active rows={5} />
          ) : (
            <>
              <p>You have been authenticated and are now logged in!</p>
              <br />
              <p>Thank you for visiting this site!</p>
              <br />
              <p>You can logout clicking the button above.</p>
            </>
          )}
        </Panel>
        {/* </PanelGroup> */}
      </FlexboxGrid>
    );
  }
}

export default LandingPage;
