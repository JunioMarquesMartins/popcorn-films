import { Spinner } from 'phosphor-react'

export function Loading() {
  return (
    <div className="h-screen flex justify-center pt-24">
      <Spinner size={80} color="white">
        <animate
          attributeName="opacity"
          values="0.8;1;0.8"
          dur="4s"
          repeatCount="indefinite"
        ></animate>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="5s"
          from="0 0 0"
          to="360 0 0"
          repeatCount="indefinite"
        ></animateTransform>
      </Spinner>
    </div>
  )
}
