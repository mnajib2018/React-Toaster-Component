/**
 * toaster component
 *
 * @author    Muhammad Najib <mnajib@wayfair.com>
 * @copyright 2017 Wayfair LLC - All rights reserved
 */

define('pl_toaster', [
  'react',
  'portal',
  'classnames',
  'lnrs',
  'pl_icon',
  '@styles/components/toaster'
], function(React, Portal, cx, Lnrs, Icon, styles) {
  'use strict';

  const {PropTypes} = React;

  class Toaster extends React.Component {
    static propTypes = {
      isOpen: PropTypes.bool,
      isExpanded: PropTypes.bool,
      onRequestClose: PropTypes.func,
      children: PropTypes.node,
      title: PropTypes.string,
      closeButtonContent: PropTypes.node,
      expandButtonContent: PropTypes.node
    };

    static defaultProps = {
      isOpen: true,
      isExpanded: true,
      closeButtonContent: Lnrs.translate('Close', 'Close'),
      expandButtonContent: Lnrs.translate('ExpandOrMinimize', 'Expand or Minimize Toaster'),
      onRequestClose: () => {}
    };

    state = {
      isOpen: this.props.isOpen,
      isExpanded: this.props.isExpanded
    };

    toasterClasses = cx({
      'Toaster': true
    });
    toasterExpandClasses = cx({
      'Toaster-expand': true,
      'minimize': !this.state.isExpanded
    });
    toasterContentClasses = cx({
      'Toaster-content': true,
      'minimize': !this.state.isExpanded
    });

    closeToaster = () => {
      this.setState(() => ({
        isOpen: false
      }));
    };

    renderCloseButton = () => (
      <button
        className="Toaster-close"
        type="button"
        onClick={() => this.closeToaster()}
      >
        <Icon
          iconId="dismiss"
          title={this.props.closeButtonContent}
          key="icon"
        />
      </button>
    );


    renderExpandButton = () => (
      <button
        className={this.toasterExpandClasses}
        type="button"
        onClick={() => this.setState(previousState => ({
          isExpanded: !previousState.isExpanded
        }))}
      >
        <Icon
          iconId="chevron-down"
          title={this.props.expandButtonContent}
          key="icon"
        />
      </button>
    );

    ToasterComponent = () => (
      <div
        className="Toaster"
        tabIndex="-1"
        role="dialog"
      >
        <div className="Toaster-header">
          {this.renderExpandButton()}
          {this.renderCloseButton()}
          <div className="Toaster-title">
            {this.props.title}
          </div>
        </div>
        <div className={this.toasterContentClasses}>
          {this.props.children}
        </div>
      </div>);

    render() {
      return (
        <Portal isOpen={this.state.isOpen}>
          {this.ToasterComponent()}
        </Portal>
      );
    }
  }
  return styles.hoc(Toaster);
});
