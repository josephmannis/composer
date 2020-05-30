import React from 'react';
import { MenuInput, MenuItem, MenuDropdown } from './styled';
import { Toggle } from '@/composer/view/components/atoms/toggle/Toggle';


interface IMenuProps {
    options: string[];
}

const Menu: React.FC<IMenuProps> = ({options}) => {
    const [current, setCurrent] = React.useState('')
    const [showOptions, toggleOptions] = React.useState(false);
    // TODO: add callaback
    React.useEffect(() => {
        if (options.length !== 0) setCurrent(options[0]);
    }, [])

    return (
        <>
            <MenuInput showMenu={showOptions} onClick={() => toggleOptions(!showOptions)}> 
                {current} 
            </MenuInput>
            <div className='relative'>
                <Toggle show={showOptions}>
                    <MenuDropdown >
                        {options.map((o, i) => <MenuItem key={i} onClick={() => {setCurrent(o); toggleOptions(!current)}}>{o}</MenuItem>) }
                    </MenuDropdown>
                </Toggle>
            </div>
        </>
    )
}

export default Menu