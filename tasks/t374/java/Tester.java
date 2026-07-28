package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.logging.*;

public class Tester {

    @Test
    public void testShouldLogErrorAndExitWhenModelIsNull() {
        // Capture log messages
        TestHandler testHandler = new TestHandler();
        Logger logger = Logger.getLogger(Answer.class.getName());
        logger.addHandler(testHandler);
        logger.setLevel(Level.ALL);

        Answer.SDF mockSdf = new Answer.SDF();

        Answer.LoadResult result = Answer.load(null, mockSdf);

        assertFalse(result.success);
        assertTrue(result.errorMessage.contains("Invalid model pointer"));
        assertTrue(testHandler.hasMessage(Level.SEVERE, "[LinkStaticTFPublisher]: Invalid model pointer! Unable to load component"));
    }

    @Test
    public void testShouldLogErrorAndStopWhenParentLinkIsMissingInSDF() {
        // Capture log messages
        TestHandler testHandler = new TestHandler();
        Logger logger = Logger.getLogger(Answer.class.getName());
        logger.addHandler(testHandler);
        logger.setLevel(Level.ALL);

        // Create mock model with links
        Answer.Link baseLink = new Answer.Link("base_link", new Answer.Pose(new Answer.Position(0,0,0), new Answer.Quaternion(0,0,0,1)));
        Answer.Link armLink = new Answer.Link("arm_link", new Answer.Pose(new Answer.Position(0,0,0), new Answer.Quaternion(0,0,0,1)));
        Answer.Link gripperLink = new Answer.Link("gripper_link", new Answer.Pose(new Answer.Position(0,0,0), new Answer.Quaternion(0,0,0,1)));

        Answer.Model mockModel = new Answer.Model(java.util.Arrays.asList(baseLink, armLink, gripperLink));
        Answer.SDF mockSdf = new Answer.SDF();
        mockSdf.addElement("childLink", "gripper_link");

        Answer.LoadResult result = Answer.load(mockModel, mockSdf);

        assertFalse(result.success);
        assertTrue(result.errorMessage.contains("Missing required element 'parentLink'"));
        assertTrue(testHandler.hasMessage(Level.SEVERE, "[LinkStaticTFPublisher]: Missing required element 'parentLink' in SDF configuration"));
        assertTrue(testHandler.hasMessage(Level.SEVERE, "[LinkStaticTFPublisher]: Please check SDF file and ensure it contains a <parentLink> tag with a valid link name"));
    }

    @Test
    public void testShouldLogErrorAndStopWhenChildLinkIsMissingInSDF() {
        TestHandler testHandler = new TestHandler();
        Logger logger = Logger.getLogger(Answer.class.getName());
        logger.addHandler(testHandler);
        logger.setLevel(Level.ALL);

        Answer.Link armLink = new Answer.Link("arm_link", new Answer.Pose(new Answer.Position(0,0,0), new Answer.Quaternion(0,0,0,1)));

        Answer.Model mockModel = new Answer.Model(java.util.Arrays.asList(armLink));
        Answer.SDF mockSdf = new Answer.SDF();
        mockSdf.addElement("parentLink", "arm_link");

        Answer.LoadResult result = Answer.load(mockModel, mockSdf);

        assertFalse(result.success);
        assertTrue(result.errorMessage.contains("Missing required element 'childLink'"));
        assertTrue(testHandler.hasMessage(Level.SEVERE, "[LinkStaticTFPublisher]: Missing required element 'childLink' in SDF configuration"));
        assertTrue(testHandler.hasMessage(Level.SEVERE, "[LinkStaticTFPublisher]: Please check SDF file and ensure it contains a <childLink> tag with a valid link name"));
        assertFalse(result.tfBroadcaster.wasSendTransformCalled());
    }

    @Test
    public void testShouldUseDefaultNamespaceAndPolicyWhenNotSpecified() {
        // Capture log messages
        TestHandler testHandler = new TestHandler();
        Logger logger = Logger.getLogger(Answer.class.getName());
        logger.addHandler(testHandler);
        logger.setLevel(Level.ALL);

        // Create mock model with links
        Answer.Pose worldPose = new Answer.Pose(new Answer.Position(0,0,0), new Answer.Quaternion(0,0,0,1));
        Answer.Link parentLink = new Answer.Link("arm_link", worldPose);
        Answer.Link childLink = new Answer.Link("gripper_link", worldPose);

        Answer.Model mockModel = new Answer.Model(java.util.Arrays.asList(parentLink, childLink));
        Answer.SDF mockSdf = new Answer.SDF();
        mockSdf.addElement("parentLink", "arm_link");
        mockSdf.addElement("childLink", "gripper_link");

        Answer.LoadResult result = Answer.load(mockModel, mockSdf);

        assertTrue(result.success);
        assertTrue(testHandler.hasMessage(Level.INFO, "[LinkStaticTFPublisher]: No robotNamespace specified, using default: /"));
        assertTrue(testHandler.hasMessage(Level.INFO, "[LinkStaticTFPublisher]: No frameNamePolicy specified, using default policy: remove_suffix"));

        // Verify that transform was sent
        assertTrue(result.tfBroadcaster.wasSendTransformCalled());
    }

    @Test
    public void testShouldNormalizeNamespaceAndUseDefaultPolicyWhenFrameNamePolicyIsInvalid() {
        TestHandler testHandler = new TestHandler();
        Logger logger = Logger.getLogger(Answer.class.getName());
        logger.addHandler(testHandler);
        logger.setLevel(Level.ALL);

        Answer.Pose worldPose = new Answer.Pose(new Answer.Position(1,2,3), new Answer.Quaternion(0,0,0,1));
        Answer.Link parentLink = new Answer.Link("arm_link", worldPose);
        Answer.Link childLink = new Answer.Link("gripper_link", worldPose);

        Answer.Model mockModel = new Answer.Model(java.util.Arrays.asList(parentLink, childLink));
        Answer.SDF mockSdf = new Answer.SDF();
        mockSdf.addElement("robotNamespace", new Answer.SDFElement("robot"));
        mockSdf.addElement("frameNamePolicy", "bad_policy");
        mockSdf.addElement("parentLink", "arm_link");
        mockSdf.addElement("childLink", "gripper_link");

        Answer.LoadResult result = Answer.load(mockModel, mockSdf);

        assertTrue(result.success);
        assertTrue(testHandler.hasMessage(Level.WARNING, "[LinkStaticTFPublisher]: Invalid frameNamePolicy: bad_policy, using default policy 'remove_suffix'"));
        java.util.Map<?, ?> transform = result.tfBroadcaster.getLastTransform();
        java.util.Map<?, ?> header = (java.util.Map<?, ?>) transform.get("header");
        assertEquals("robot/arm", header.get("frame_id"));
        assertEquals("robot/gripper", transform.get("child_frame_id"));
    }

    // Helper class to capture log messages
    private static class TestHandler extends Handler {
        private java.util.List<LogRecord> records = new java.util.ArrayList<>();

        public TestHandler() {
            super();
        }

        @Override
        public void publish(LogRecord record) {
            records.add(record);
        }

        @Override
        public void flush() {}

        @Override
        public void close() throws SecurityException {}

        public boolean hasMessage(Level level, String message) {
            for (LogRecord record : records) {
                if (record.getLevel().equals(level) && record.getMessage().contains(message)) {
                    return true;
                }
            }
            return false;
        }
    }
}
