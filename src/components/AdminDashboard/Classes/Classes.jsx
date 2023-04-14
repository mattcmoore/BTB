import { useContext } from 'react'
import BtbContext from '../../../context/BtbContext'
import './Classes.css'

const Classes = () => {
    const {adminModal} = useContext(BtbContext)
    if (adminModal === 'classes') {
        return (
            <div className='wrapper'>
                <div className='accordian'>
                    {data.map((item, i) => (
                        <div className='item'>
                            <div className='title'>
                                <h2>{item.question}</h2>
                                <span>+</span>
                            </div>
                            <div className='content'>{item.answer}</div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const data = [
    {
        question: 'smafkmfs',
        answer:'ldsmflsdfmsdmflmsdfmlsfdm'
    }
]

export default Classes