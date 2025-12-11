export type FileType = 'spreadsheet' | 'deck' | 'pdf' | 'doc' | 'email' | 'slack';

export interface MockFile {
  id: string;
  name: string;
  type: FileType;
  summary: string;
  content?: string;
  url?: string;
  keywords: string[];
}

export const mockFiles: MockFile[] = [
  {
    id: '1',
    name: 'Q3_Financials_v2.xlsx',
    type: 'spreadsheet',
    summary: 'Q3 Financial Report including revenue breakdown and projection.',
    keywords: ['financials', 'q3', 'spreadsheet', 'numbers', 'revenue', 'report'],
  },
  {
    id: '2',
    name: 'Product_Roadmap_2024.pptx',
    type: 'deck',
    summary: 'Strategic roadmap for 2024 product launches and features.',
    keywords: ['roadmap', 'deck', 'slides', 'presentation', '2024', 'product'],
  },
  {
    id: '3',
    name: 'Competitor_Analysis.pdf',
    type: 'pdf',
    summary: 'Deep dive into competitor features and market share.',
    keywords: ['competitor', 'analysis', 'pdf', 'market', 'report'],
  },
  {
    id: '4',
    name: 'Meeting_Notes_Oct_12.docx',
    type: 'doc',
    summary: 'Notes from the weekly sync regarding marketing strategy.',
    keywords: ['notes', 'meeting', 'doc', 'marketing', 'strategy'],
  },
  {
    id: '5',
    name: 'Email: Project Alpha Update',
    type: 'email',
    summary: 'Update from Sarah regarding the Alpha launch delay.',
    keywords: ['email', 'alpha', 'update', 'sarah', 'delay'],
  },
];

