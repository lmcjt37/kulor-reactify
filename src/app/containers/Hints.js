import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import themedHints from '../theme/themedHints';

export default class Hints extends React.Component {

    constructor(props) {
        super(props);
    }

    getContent() {
        let array = this.props.dialogs.helphints.text;
        return (
            <ul className={themedHints.list}>
                {array.map((text,i) => <li key={i} className={themedHints.listItem}>{text}</li>)}
            </ul>
        )
    }

    handleToggle() {
        this.props.onStateChange({ isDialogActive: false });
    }

    render() {
        const actions = [
            { label: "Close", onClick: () => this.handleToggle() }
        ];
        return (
            <Dialog
              actions={actions}
              active={this.props.isDialogActive}
              onEscKeyDown={() => this.handleToggle()}
              onOverlayClick={() => this.handleToggle()}
              title={this.props.dialogs.helphints.title} >

                {this.getContent()}

            </Dialog>
        );
    }
}
