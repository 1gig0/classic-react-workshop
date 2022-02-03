////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Fill in the test stubs to make the tests pass
////////////////////////////////////////////////////////////////////////////////
import "./mocha-setup";

import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import expect from "expect";

import data from "./data";
import Tabs from "./components/Tabs";

describe("when <Tabs> is rendered", () => {
  let node, tabs, activeTab;

  const checkTapActivation = (index, isActive) => {
    if(isActive) {
      expect(tabs[index].style.borderBottomColor).toEqual(activeTab.style.borderBottomColor);
    } else {
      expect(tabs[index].style.borderBottomColor).not.toEqual(activeTab.style.borderBottomColor);
    }
  }

  beforeEach(() => {
    node = document.createElement("div");
    ReactDOM.render(<Tabs data={data} />, node);

    tabs = node.querySelectorAll(".Tab");

    activeTab = document.createElement("div");
    activeTab.setAttribute("style", "border-bottom-color: #000");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it("renders all tabs", () => {
    tabs.forEach((tab, index) => {
      expect(tab.innerText).toEqual(data[index].name);
    })
  })

  it("activates the first tab", () => {
    checkTapActivation(0, true);
  });

  it("does not activate the second tab", () => {
    checkTapActivation(1, false);
  });

  describe("after clicking the second tab", () => {
    beforeEach(() => {
      Simulate.click(tabs[1]);
    });

    it("activates the second tab", () => {
      checkTapActivation(1, true);
    });

    it("deactivates the first tab", () => {
      checkTapActivation(0, false);
    });

    it("puts the correct content in the panel", () => {
      const tabPanel = node.querySelector('.TabPanel');
      expect(tabPanel.innerText).toEqual(data[1].description);
    });
  });
});
