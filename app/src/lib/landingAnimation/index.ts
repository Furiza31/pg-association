let degree = 0;
let gradientOffsetX = 0;
let gradientDirection = 1;
let colorBlendFactor = 0;
const GRADIENT_SPEED = 5;
const AMPLITUDE = 50;
const PERIOD = 1000;
const SPEED = 2;
const ORIGINAL_COLORS = ["#938FF1", "#A784F1", "#B892F4"];
const REVERSED_COLORS = [...ORIGINAL_COLORS].reverse();

export const draw = (
  window: Window,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(
    gradientOffsetX,
    0,
    canvas.width + gradientOffsetX,
    canvas.height
  );

  for (let i = 0; i < ORIGINAL_COLORS.length; i++) {
    const originalColor = ORIGINAL_COLORS[i];
    const reversedColor = REVERSED_COLORS[i];

    const blendedColor = blendColors(
      originalColor,
      reversedColor,
      colorBlendFactor
    );

    gradient.addColorStop(i / (ORIGINAL_COLORS.length - 1), blendedColor);
  }

  ctx.fillStyle = gradient;

  ctx.beginPath();
  ctx.moveTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(0, canvas.height * 0.55);
  for (let x = 0; x <= canvas.width; x++) {
    let y = -AMPLITUDE * Math.sin((Math.PI / PERIOD) * (degree + x));
    ctx.lineTo(x, y + canvas.height * 0.55);
  }
  ctx.lineTo(canvas.width, canvas.height);
  ctx.fill();
  ctx.closePath();

  gradientOffsetX += GRADIENT_SPEED * gradientDirection;

  if (gradientOffsetX >= canvas.width || gradientOffsetX <= -canvas.width) {
    gradientDirection *= -1;
  }

  if (gradientDirection === 1) {
    colorBlendFactor = Math.min(colorBlendFactor + 0.001, 1);
  } else {
    colorBlendFactor = Math.max(colorBlendFactor - 0.001, 0);
  }

  if (degree == 2000) {
    degree = 0;
  }
  degree += SPEED;

  window.requestAnimationFrame(() => draw(window, ctx, canvas));
};

function blendColors(color1: string, color2: string, factor: number) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const r = Math.round(c1.r + factor * (c2.r - c1.r));
  const g = Math.round(c1.g + factor * (c2.g - c1.g));
  const b = Math.round(c1.b + factor * (c2.b - c1.b));

  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}
