import { COLORS, PANEL_LENGTH } from '../../utils/constants';
import styles from './Fence.module.css';

const PANEL_WIDTH = 120;
const POST_WIDTH = 10;
const MARGIN = 30;
const TOP = 30;
const PIXELS_PER_METER = 70;
const VERTICAL_WIRES = 9;

export default function Fence({ panels, height, color }) {
  const panelHeight = height * PIXELS_PER_METER;
  const groundY = TOP + panelHeight + 20;
  const width = panels * PANEL_WIDTH + POST_WIDTH + MARGIN * 2;
  const totalHeight = groundY + 30;
  const fill = COLORS[color];
  const stroke = color === 'branca' ? '#94a3b8' : fill;
  const horizontalWires = Math.round(height * 3);
  const posts = panels + 1;

  return (
    <div className={styles.sketch}>
      <svg
        viewBox={`0 0 ${width} ${totalHeight}`}
        role="img"
        aria-label="Esboço da cerca"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dbeafe" />
            <stop offset="1" stopColor="#f0f9ff" />
          </linearGradient>
        </defs>
        <rect width={width} height={groundY} fill="url(#sky)" />
        <rect
          y={groundY}
          width={width}
          height={totalHeight - groundY}
          fill="#86efac"
        />
        <rect y={groundY} width={width} height={4} fill="#4ade80" />

        {Array.from({ length: panels }, (_, i) => {
          const x = MARGIN + i * PANEL_WIDTH + POST_WIDTH;
          const w = PANEL_WIDTH - POST_WIDTH;
          const y = TOP + 6;
          return (
            <g key={i} stroke={stroke} fill="none">
              <rect
                x={x}
                y={y}
                width={w}
                height={panelHeight}
                strokeWidth={2}
              />
              {Array.from({ length: VERTICAL_WIRES }, (_, j) => {
                const wireX = x + ((j + 1) * w) / (VERTICAL_WIRES + 1);
                return (
                  <line
                    key={j}
                    x1={wireX}
                    y1={y}
                    x2={wireX}
                    y2={y + panelHeight}
                    strokeWidth={1.2}
                  />
                );
              })}
              {Array.from({ length: horizontalWires }, (_, j) => {
                const wireY =
                  y + ((j + 1) * panelHeight) / (horizontalWires + 1);
                return (
                  <line
                    key={j}
                    x1={x}
                    y1={wireY}
                    x2={x + w}
                    y2={wireY}
                    strokeWidth={2.5}
                  />
                );
              })}
            </g>
          );
        })}

        {Array.from({ length: posts }, (_, i) => {
          const x = MARGIN + i * PANEL_WIDTH;
          return (
            <g key={i}>
              <rect
                x={x}
                y={TOP}
                width={POST_WIDTH}
                height={groundY - TOP + 6}
                fill={fill}
                stroke={stroke}
                rx={1}
              />
              <rect
                x={x - 2}
                y={TOP - 4}
                width={POST_WIDTH + 4}
                height={6}
                fill={fill}
                stroke={stroke}
                rx={1}
              />
            </g>
          );
        })}

        <text
          x={width / 2}
          y={totalHeight - 8}
          textAnchor="middle"
          fontSize="12"
          fill="#166534"
        >
          {panels} {panels === 1 ? 'tela' : 'telas'} · {posts} postes ·{' '}
          {(panels * PANEL_LENGTH).toLocaleString('pt-BR')} m
        </text>
      </svg>
    </div>
  );
}
