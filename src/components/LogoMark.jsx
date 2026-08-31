import { asset } from '../utils/asset.js'

export default function LogoMark({ className = 'logo-mark', light = false }) {
  return (
    <img
      className={className}
      src={asset(light ? 'images/logo-light.png' : 'images/logo.png')}
      alt=""
      width="56"
      height="48"
    />
  )
}

