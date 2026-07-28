describe('LinkStaticTFPublisher - load method', () => {
        let publisher, mockModel, mockSdf, mockTfBroadcaster, originalConsole;

        beforeEach(() => {
            publisher = new LinkStaticTFPublisher();
            mockModel = {
                getLink: jest.fn(),
                getLinks: jest.fn().mockReturnValue([
                    { getName: () => 'base_link' },
                    { getName: () => 'arm_link' },
                    { getName: () => 'gripper_link' }
                ])
            };
            mockSdf = {
                hasElement: jest.fn(),
                getElement: jest.fn().mockReturnValue({ get: jest.fn() }),
                get: jest.fn()
            };
            mockTfBroadcaster = { sendTransform: jest.fn() };

            global.ROS = { NodeHandle: jest.fn() };
            global.ros = { Time: { now: jest.fn().mockReturnValue('2024-05-20T12:00:00Z') } };
            global.geometry_msgs = {
                TransformStamped: jest.fn().mockImplementation(() => ({
                    header: { stamp: null, frame_id: null },
                    child_frame_id: null,
                    transform: { translation: { x:0,y:0,z:0 }, rotation: { x:0,y:0,z:0,w:0 } }
                }))
            };

            originalConsole = { ...console };
            console.error = jest.fn();
            console.info = jest.fn();
            console.debug = jest.fn();
            console.warn = jest.fn();

            publisher.tfBroadcaster = mockTfBroadcaster;
            processFrameName = jest.fn().mockReturnValue('processed_frame');
            subtractPoses = jest.fn().mockReturnValue({
                pos: { x: 0.5, y: 0.2, z: 0.8 },
                rot: { x: 0, y: 0, z: 0.7071, w: 0.7071 }
            });
        });

        afterEach(() => {
            console.error = originalConsole.error;
            console.info = originalConsole.info;
            console.debug = originalConsole.debug;
            console.warn = originalConsole.warn;
            jest.clearAllMocks();
            delete global.ROS;
            delete global.ros;
            delete global.geometry_msgs;
        });

        test('1. Should log error and exit when model is null', () => {
            publisher.load(null, mockSdf);
            expect(console.error).toHaveBeenCalledWith(
                '[LinkStaticTFPublisher]: Invalid model pointer! Unable to load component'
            );
            expect(mockSdf.hasElement).not.toHaveBeenCalled();
            expect(mockModel.getLink).not.toHaveBeenCalled();
        });

        test('2. Should log error and stop when parentLink is missing in SDF', () => {
            mockSdf.hasElement.mockImplementation((elem) => {
                return elem === 'childLink';
            });
            publisher.load(mockModel, mockSdf);

            expect(console.error).toHaveBeenNthCalledWith(
                1,
                '[LinkStaticTFPublisher]: Missing required element \'parentLink\' in SDF configuration'
            );
            expect(console.error).toHaveBeenNthCalledWith(
                2,
                '[LinkStaticTFPublisher]: Please check SDF file and ensure it contains a <parentLink> tag with a valid link name'
            );
            expect(mockModel.getLink).not.toHaveBeenCalled();
            expect(publisher.tfBroadcaster.sendTransform).not.toHaveBeenCalled();
        });

        test('3. Should log error and stop when childLink is missing in SDF', () => {
            mockSdf.hasElement.mockImplementation((elem) => elem === 'parentLink');
            mockSdf.get.mockReturnValue('arm_link');

            publisher.load(mockModel, mockSdf);

            expect(console.error).toHaveBeenNthCalledWith(
                1,
                '[LinkStaticTFPublisher]: Missing required element \'childLink\' in SDF configuration'
            );
            expect(console.error).toHaveBeenNthCalledWith(
                2,
                '[LinkStaticTFPublisher]: Please check SDF file and ensure it contains a <childLink> tag with a valid link name'
            );
            expect(mockModel.getLink).not.toHaveBeenCalled();
            expect(publisher.tfBroadcaster.sendTransform).not.toHaveBeenCalled();
        });



        test('4. Should use default namespace and policy when not specified', () => {
            mockSdf.hasElement.mockImplementation((elem) => {
                return elem === 'parentLink' || elem === 'childLink';
            });
            mockSdf.get.mockReturnValueOnce('arm_link').mockReturnValueOnce('gripper_link');
            mockModel.getLink.mockReturnValue({
                getName: () => 'valid_link',
                worldPose: () => ({ pos: {x:0,y:0,z:0}, rot: {x:0,y:0,z:0,w:1} })
            });

            publisher.load(mockModel, mockSdf);

            expect(console.info).toHaveBeenCalledWith(
                '[LinkStaticTFPublisher]: No robotNamespace specified, using default: /'
            );
            expect(console.info).toHaveBeenCalledWith(
                '[LinkStaticTFPublisher]: No frameNamePolicy specified, using default policy: remove_suffix'
            );
            expect(processFrameName).toHaveBeenCalledTimes(2);
            expect(subtractPoses).toHaveBeenCalledTimes(1);
            expect(publisher.tfBroadcaster.sendTransform).toHaveBeenCalledTimes(1);
        });

        test('5. Should normalize namespace and use default policy when frameNamePolicy is invalid', () => {
            mockSdf.hasElement.mockImplementation((elem) => {
                return elem === 'robotNamespace' || elem === 'frameNamePolicy' || elem === 'parentLink' || elem === 'childLink';
            });
            mockSdf.getElement.mockReturnValue({ get: jest.fn().mockReturnValue('robot') });
            mockSdf.get.mockImplementation((elem) => {
                if (elem === 'frameNamePolicy') return 'bad_policy';
                if (elem === 'parentLink') return 'arm_link';
                return 'gripper_link';
            });
            mockModel.getLink.mockReturnValue({
                getName: () => 'valid_link',
                worldPose: () => ({ pos: {x:0,y:0,z:0}, rot: {x:0,y:0,z:0,w:1} })
            });

            publisher.load(mockModel, mockSdf);

            expect(console.debug).toHaveBeenCalledWith(
                '[LinkStaticTFPublisher]: Automatically added trailing slash to namespace: robot/'
            );
            expect(console.warn).toHaveBeenCalledWith(
                "[LinkStaticTFPublisher]: Invalid frameNamePolicy: bad_policy, using default policy 'remove_suffix'"
            );
            expect(processFrameName).toHaveBeenNthCalledWith(1, 'arm_link', 'remove_suffix', 'robot/');
            expect(processFrameName).toHaveBeenNthCalledWith(2, 'gripper_link', 'remove_suffix', 'robot/');
            expect(publisher.tfBroadcaster.sendTransform).toHaveBeenCalledTimes(1);
        });

    });
