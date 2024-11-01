// 示例API实现
app.get('/api/check-ip', async (req, res) => {
  const ip = req.ip;
  const isNewIP = await checkIfNewIP(ip); // 需要实现检查IP的逻辑
  res.json({ isNewIP });
}); 