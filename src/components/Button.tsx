import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  id?: number
  text: string
  onclick?: any
  link?: any
  className?: string
  type: 'link' | 'button'
  children?: ReactNode
}

export function Button(props: ButtonProps) {
  const buttonClass = `${props.className} bg-slate-800 hover:bg-slate-900 py-2 px-4 mb-4 flex gap-1 w-44 items-center justify-center mt-4 md:mt-0`

  return props.type === 'link' ? (
    <Link className={buttonClass} to={props.link}>
      {props.text} {props.children}
    </Link>
  ) : (
    <button className={buttonClass} type="button" onClick={props.onclick}>
      {props.text}
      {props.children}
    </button>
  )
}
