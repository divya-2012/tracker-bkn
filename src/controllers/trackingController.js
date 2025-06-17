const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add tracking data
exports.addTrackingData = async (req, res) => {
  try {
    const { sessionId, digiPin, timestamp } = req.body;
    
    if (!sessionId || !digiPin || !timestamp) {
      return res.status(400).json({
        success: false,
        message: 'sessionId, digiPin, and timestamp are required'
      });
    }
    
    // Verify the session exists and belongs to the right digiPin
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        digiPin
      }
    });
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found or digiPin mismatch'
      });
    }
    
    // Create tracking data entry
    await prisma.trackingData.create({
      data: {
        sessionId,
        timestamp: new Date(timestamp)
      }
    });
    
    return res.json({
      success: true
    });
  } catch (error) {
    console.error('Error adding tracking data:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add tracking data'
    });
  }
};
