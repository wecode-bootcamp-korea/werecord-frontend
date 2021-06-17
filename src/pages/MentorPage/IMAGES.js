const CONTENTS_IMAGES = [
  'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1589585374338-20ef873a738a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1542546068979-b6affb46ea8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1520583457224-aee11bad5112?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',
  'https://images.unsplash.com/photo-1608759991391-370fb9fbf7b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80',
  'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1525373698358-041e3a460346?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2133&q=80',
  'https://images.unsplash.com/photo-1599837565318-67429bde7162?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1599041125553-a3b967646ca5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=703&q=80',
  'https://images.unsplash.com/photo-1580894906475-403276d3942d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1581978846964-d3ee3ed0bed1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY4fHxjb2RlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1520509414578-d9cbf09933a1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTg0fHxjb2RlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1543013309-0d1f4edeb868?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjAyfHxjb2RlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1607706009771-de8808640bcf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjIyfHxjb2RlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1528660544347-95a93c58e424?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1618410325698-018bb3eb2318?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1558986377-c44f6a2b50f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1504969452-3a3567e73abe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjU1fHxjb2RlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1510751007277-36932aac9ebd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=677&q=80',
];

export default CONTENTS_IMAGES;
