export const PANEL_LENGTH = 2.5;

export const HEIGHTS = [1.03, 1.53, 2.03];

export const COLORS = {
  'sem pintura': '#8b929a',
  branca: '#f8fafc',
  preta: '#1f2937',
  verde: '#15803d',
};

export const DEFAULT_COLOR = 'sem pintura';

export const formatMeters = (value) =>
  `${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m`;

export const formatDate = (value) =>
  new Date(value).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
