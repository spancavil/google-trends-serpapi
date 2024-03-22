import React from 'react'

type InputProps = {
    children?: React.ReactNode,
    value: string
    onChange: (value: string) => void
    placeholder: string
}

const Input = ({children, value, onChange, placeholder}: InputProps) => {
  return (
    <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder= {placeholder || ''}
        className='w-240 p-3 text-xl h-10 bg-slate-800 text-slate-200'
    />
  )
}

export default Input