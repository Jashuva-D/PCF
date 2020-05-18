import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IconButton,PrimaryButton} from 'office-ui-fabric-react';

class DisplayText extends React.Component {
    constructor(props : {}){
        super(props);
    }

    public render() : JSX.Element {
        return (
            <div>
                Hello this is text message from sample display text.
                <IconButton  iconProps={{iconName : "delete"}}/>
            </div>
        )
    }
}

export default DisplayText;