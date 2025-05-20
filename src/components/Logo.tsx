interface LogoProps {
  isDarkMode?: boolean;
  showText?: boolean;
  showLogo?: boolean;
  className?: string;
}

function Logo({isDarkMode, showText, showLogo = true, className}: LogoProps) {
  const fillColor = isDarkMode ? 'rgb(30 14 62)' : 'rgb(70 34 142)'; // Lighter in light mode, darker in dark mode
  return (
    <div className={`flex items-center ${className}`}>
      {showLogo && (
        <svg
          width="32"
          height="32"
          viewBox="0 0 256 256"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M128 0C198.693 0 256.001 57.3077 256.001 128C256.001 198.692 198.693 256 128 256C104.898 256 83.2267 249.878 64.5166 239.171C104.469 254.036 157.053 239.948 195.185 200.462C243.35 150.586 250.214 79.0757 210.517 40.7402C170.819 2.405 99.592 11.7614 51.4268 61.6377C14.5649 99.8092 1.89372 150.651 15.7715 189.597C5.72014 171.322 2.76251e-05 150.33 0 128C0 57.3078 57.3075 0.000148923 128 0ZM202.565 122.844L123.575 199.229C123.509 199.318 123.441 199.407 123.369 199.493C123.136 199.772 122.853 200.022 122.515 200.254L121.728 201.017L121.523 200.806C119.985 201.527 117.67 202.124 114.23 203.007L40.9902 221.796C35.5997 223.179 32.9037 223.87 31.0703 223.145C29.4718 222.512 28.2222 221.231 27.6367 219.627C26.9653 217.787 27.7511 215.138 29.3223 209.843L50.668 137.896C52.2019 132.726 52.9698 130.141 54.5117 128.958C54.7725 128.758 55.047 128.58 55.333 128.427L134.206 52.1553L202.565 122.844ZM83.0635 130.825L122.225 171.322L172.87 122.347L133.709 81.8496L83.0635 130.825Z"
            fill={fillColor}
          />
        </svg>
      )}

      {showText && (
        <span
          className="ml-2 font-bold"
          style={{color: fillColor}}>
          DrawOrbit
        </span>
      )}
    </div>
  );
}

export default Logo;
