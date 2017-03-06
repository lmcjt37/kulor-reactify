import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';

export default class Hints extends React.Component {

    constructor(props) {
        super(props);
    }

    getContent() {
        let array = this.props.dialogs.helphints.text;
        return array.map((text,i) => <p key={i} style={{paddingBottom: '10px'}}>{text}</p>);
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
