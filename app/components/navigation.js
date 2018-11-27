"use strict"; /* global window */



//  P A C K A G E S

import html from "choo/html";
import Component from "choo/component";
import xtend from "xtend";



//  E X P O R T

export default class Navigation extends Component {
  constructor() {
    super();

    this.state = {
      active: true,
      links: [{
        name: "About",
        title: "About Ideas Never Cease",
        url: "/about"
      }, {
        name: "Projects",
        title: "Check out the Projects that Ideas Never Cease is working on!",
        url: "/projects"
      }, {
        name: "Contact",
        title: "Have a question? Get the contact info for Ideas Never Cease here",
        url: "/contact"
      }],
      scrollY: 0
    };

    this.frame;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.renderLink = this.renderLink.bind(this);
  }

  load() {
    let self = this;

    setTimeout(() => {
      self.rerender();
    }, 100);

    window.addEventListener("mousemove", this.handleMouseMove, false);
  }

  unload() {
    this.state.scrollY = 0;
    window.removeEventListener("mousemove", this.handleMouseMove, false);
  }

  createElement(props) {
    this.state = xtend(this.state, props);

    /*
    <nav>
      <div class="inner-wrap">
        {{{ navigation }}}
      </div>
    </nav>
    */

    return html`
      <nav>
        <div class="inner-wrap">
          ${this.state.links.map(this.renderLink)}
          <a class="header__navigation__item" data-toggle="navigation" href="#" title="Toggle navigation menu">Menu</a>
        </div>
      </nav>

      <script>
        document.querySelector("[data-toggle='navigation']").addEventListener("click", event => {
          event.preventDefault();
          document.querySelector(".header__navigation").classList.toggle("active");
        });
      </script>
    `;
  }

  handleMouseMove(event) {
    if (event.clientY < this.element.querySelector("[data-nav]").offsetHeight * 1.25) {
      this.show();
    }
  }

  handleScroll() {
    let scrollY = window.scrollY;

    if (scrollY === this.state.scrollY) {
      return;
    } else {
      if (scrollY > this.state.scrollY && scrollY > 100) {
        this.hide();
      } else {
        this.show();
      }

      /*
      if (scrollY < this.getBoundingHeight()) {
        this.aboveFold();
      } else {
        this.belowFold();
      }
      */

      this.state.scrollY = scrollY;
    }
  }

  getBoundingHeight() {
    if (typeof this.state.getBoundingHeight === "function") {
      return this.state.getBoundingHeight();
    } else {
      return window.innerHeight;
    }
  }

  show() {
    if (!this.state.active) {
      this.state.active = true;
      this.rerender();
    }
  }

  hide() {
    if (this.state.active) {
      this.state.active = false;
      this.rerender();
    }
  }

  renderLink(props, i, arr) { // eslint-disable-line
    let activeClass;

    if (this.state.href === "/" && props.url === "/") {
      activeClass = true;
    } else if (props.url !== "/" && this.state.href.indexOf(props.url) >= 0) {
      activeClass = true;
    }

    return html`
      <a class="header__navigation__item${activeClass ? " active" : ""}" href="${props.url}" title="${props.title}">${props.name}</a>
    `;
  }

  update(props) {
    return props.href !== this.state.href;
  }
}
