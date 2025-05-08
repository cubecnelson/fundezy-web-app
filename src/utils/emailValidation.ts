export const UNIVERSITY_EMAIL_DOMAINS = [
  'hku.hk',
  'connect.hku.hk',
  'graduate.hku.hk',
  'cuhk.edu.hk',
  'link.cuhk.edu.hk',
  'ust.hk',
  'connect.ust.hk',
  'polyu.edu.hk',
  'connect.polyu.hk',
  'cityu.edu.hk',
  'my.cityu.edu.hk',
  'gapps.cityu.edu.hk',
  'hkbu.edu.hk',
  'life.hkbu.edu.hk',
  'associate.hkbu.edu.hk',
  'ln.edu.hk',
  's.eduhk.hk',
  'eduhk.hk',
  'hkmu.edu.hk',
  'ouhk.edu.hk',
  'hksyu.edu',
  'hsu.edu.hk',
  'cihe.edu.hk',
  'sf.edu.hk'
];

export const isUniversityEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? UNIVERSITY_EMAIL_DOMAINS.includes(domain) : false;
}; 