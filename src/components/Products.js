import { useState } from 'react'
import { IconMinus, IconPlus } from '@tabler/icons-react'

import './styles/products.css'

export default function Products ({ p }) {

    const [ amountP, setAmountP ] = useState(1)

    const handleChangeAmount = (std) => setAmountP(std === 'max' ? amountP + 1 : amountP - 1)

    return (

        <div className={`__product`}>
            <div className='__product_img'></div>
            <div className='__product_txt'>
                <h3>{p.name}</h3>
                <p className='__text'>{p.text}</p>
                <div className='__prices'>
                    <p>S/{(p.priceU).toFixed(2)}</p>
                    <p>S/{(p.priceD).toFixed(2)}</p>
                </div>
                <div className='__product_controls'>
                    <button onClick={() => handleChangeAmount('min')}><IconMinus/></button>
                    <div className='__num'>{amountP}</div>
                    <button onClick={() => handleChangeAmount('max')}><IconPlus/></button>
                </div>
            </div>
        </div>

    )

}