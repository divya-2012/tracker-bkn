const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Start a new session
exports.startSession = async (req, res) => {
  try {
    const { digiPin } = req.body;
    
    if (!digiPin) {
      return res.status(400).json({
        success: false,
        message: 'digiPin is required'
      });
    }
    
    const timestamp = Date.now();
    const session = await prisma.session.create({
      data: {
        digiPin,
        startTime: new Date(timestamp),
      }
    });
    
    return res.status(201).json({
      sessionId: session.id,
      timestamp
    });
  } catch (error) {
    console.error('Error starting session:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to start session'
    });
  }
};

// End a session and get summary
exports.endSession = async (req, res) => {
  try {
    const { sessionId, endTimestamp } = req.body;
    
    if (!sessionId || !endTimestamp) {
      return res.status(400).json({
        success: false,
        message: 'sessionId and endTimestamp are required'
      });
    }
    
    // Find the session
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { TrackingData: true }
    });
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }
    
    // Update the session with end time
    await prisma.session.update({
      where: { id: sessionId },
      data: { endTime: new Date(endTimestamp) }
    });
    
    // Calculate duration
    const startTime = session.startTime.getTime();
    const endTime = endTimestamp;
    const duration = endTime - startTime;
    
    // Create session summary
    const sessionSummary = {
      sessionId: session.id,
      startTime,
      endTime,
      duration,
      dataPointsCount: session.TrackingData.length
    };
    
    return res.json({
      success: true,
      sessionSummary
    });
  } catch (error) {
    console.error('Error ending session:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to end session'
    });
  }
};
