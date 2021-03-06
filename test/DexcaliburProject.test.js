

const chai = require('chai');
const expect = chai.expect;

const Path = require("path");


// -- App specific --

const TEST_CONFIG = Path.join( __dirname, './res/config_test.js');
const TEST_CONFIG2 = Path.join( __dirname, './res/config_test_2.js');

var Logger = null;
var CONFIG = null;

const TestHelper = require('../src/TestHelper.js');
const Configuration = require('../src/Configuration.js');
const AndroidAppAnalyzer = require('../src/AndroidAppAnalyzer.js');
const Analyzer = require('../src/Analyzer.js');


const AnalysisHelper = require("../src/AnalysisHelper.js");
const Finder = require("../src/Finder.js");
const DeviceManager = require("../src/DeviceManager.js");
const HookHelper = require("../src/HookManager.js");
const DexHelper = require("../src/DexHelper.js");
const InspectorManager = require("../src/InspectorManager.js");
const Workspace = require("../src/Workspace.js");
const WebServer = require("../src/WebServer.js");
const GraphMaker = require("../src/Graph.js");
const Bus = require("../src/Bus.js");
const Event = require("../src/Event.js");
const ApkHelper = require("../src/ApkHelper.js");
const FridaGenerator = require("../src/FridaGenerator.js");

const DataAnalyzer = require('../src/DataAnalyzer.js');

const DexcaliburEngine = require('../src/DexcaliburEngine');
const DexcaliburProject = require('../src/DexcaliburProject');


describe('DexcaliburProject', function() {

    let gEngine = null;

    before(function(){
        gEngine = new DexcaliburEngine(); //TestHelper.getDexcaliburEngine();
    })

    beforeEach(function() {

        Logger = require("../src/Logger.js")({
            testMode: true,
            debugMode: false
        },true);
    });

    afterEach(function() {
       // console.log.restore();
    });
    
    describe('new - default', function() {
        let p = null; // new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);


        it('configuration path', function () {
            //c = new Configuration();
            //c.import(require("../../"));

            p = new DexcaliburProject(gEngine, "owasp.mstg.uncrackable1");
           
            // the flag should be 1
            expect(p.engine).to.be.an.instanceOf(DexcaliburEngine);

            // if Frida is disabled, the hook manager manager should be aware.
            expect(p.uid).to.equals("owasp.mstg.uncrackable1");
        });
    });

    /*
    describe('init()', function() {
        let p = null; // new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

        it('init project', function () {
            p = new DexcaliburProject(gEngine, "owasp.mstg.uncrackable1");
            p.init();

            // test context 
            expect(p.pkg).to.equals("owasp.mstg.uncrackable1");
            expect(p.find).to.be.an.instanceOf(Finder.SearchAPI);
            expect(p.analyze).to.be.an.instanceOf(Analyzer);
            expect(p.hook).to.be.an.instanceOf(HookHelper.Manager);
            expect(p.workspace).to.be.an.instanceOf(Workspace);
            expect(p.dataAnalyser).to.be.an.instanceOf(DataAnalyzer.Analyzer);
            expect(p.appAnalyzer).to.be.an.instanceOf(AndroidAppAnalyzer);
            expect(p.bus).to.be.an.instanceOf(Bus);
            expect(p.graph).to.be.an.instanceOf(GraphMaker);
            
        });

        it('reinit project', function () {
            p = new DexcaliburProject(gEngine, "owasp.mstg.uncrackable1");

            expect(p.pkg).to.equals("owasp.mstg.uncrackable1");

            p.initDexcalibur("owasp.mstg.uncrackable2");

            expect(p.pkg).to.equals("owasp.mstg.uncrackable2");
        });
    });

    describe('changeProject()', function() {
        let p = null; // new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

    });

    describe('getConfiguration()', function() {
        let p = new DexcaliburProject( gEngine, "owasp.mstg.uncrackable1");

        it('should return Configuration instance', function () {
            expect(p.getConfiguration()).to.be.an.instanceOf(Configuration);
            expect(p.getConfiguration().apktPath).to.be.deep.equal("/home/example/tools/apktool");
        });
    });

    describe('getDataAnalyzer()', function() {
        let p = new DexcaliburProject( gEngine, "owasp.mstg.uncrackable1");

        it('should return DataAnalyzer instance', function () {
            expect(p.getDataAnalyzer()).to.be.an.instanceOf(DataAnalyzer.Analyzer);
        });
    });

    describe('getAppAnalyzer()', function() {
        let p = new DexcaliburProject( gEngine, "owasp.mstg.uncrackable1");

        it('should return AndroidAppAnalyzer instance', function () {
            expect(p.getAppAnalyzer()).to.be.an.instanceOf(AndroidAppAnalyzer);
        });
    });

    describe('getAnalyzer()', function() {
        let p = new DexcaliburProject( gEngine, "owasp.mstg.uncrackable1");

        it('should return Analyzer instance', function () {
            expect(p.getAnalyzer()).to.be.an.instanceOf(Analyzer);
        });
    });

    describe('showAPIs()', function() {
        let p = null; // new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

        it('with default configurat', function () {
            p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

            expect(p.cfgpath).to.equals(TEST_CONFIG);

            expect(Logger.expect({
                type: "info",
                value: " Given configuration file loaded"
            })).to.equals(true); 

            expect(p.getConfiguration()).to.be.not.null(); 
            
        });
    });

    describe('useAPI()', function() {
        let p = null; // new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

        it('builtin API', function () {

            p = new DexcaliburProject(gEngine, "owasp.mstg.uncrackable1");

            p.usePlatform("sdk_androidapi_29_google");

//            expect(p.getTargetPlatformPath()).to.be.equals(
//                Path.join( __dirname, "../APIs/android_24")); 
//            expect(p.getConfiguration().getTargetPlatformPath()).to.be.not.null(); 
            
        });

        // TODO custom API + downloaded API
    });
    
    describe('scan()', function() {
        let p = null; // new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

       /* it('with default configurat', function () {
            p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

            expect(p.cfgpath).to.equals(TEST_CONFIG);

            expect(Logger.expect({
                type: "info",
                value: " Given configuration file loaded"
            })).to.equals(true); 

            expect(p.getConfiguration()).to.be.not.null(); 
            
        });
    });

    describe('scanForFiles()', function() {
        let p = null; // new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

        it('with default configurat', function () {
            // tdodo
        });
    });

    describe('fullscan()', function() {
        let p = null; // new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

        it('without API', function () {        
            // p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);
        });
        it('using Android API', function () {        
            // p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);
        });
        it('using Custom API', function () {        
            // TODO
            // p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);
        });
        it('using Additional Dex', function () {        
            // p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);
        });
        it('using boot.oat', function () {      
            // TODO  
            // p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);
        });
    });

    describe('trigger()', function() {
        let p = null; // new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);
       // p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

        it('event init', function () {
         //   p.trigger({ });

            
        });
    });

    describe('pull()', function() {
        // TODO
    });

    describe('useEmulator()', function() {
        // TODO
    });

    describe('start()', function() {
        // TODO 
    });

    /*
    describe('startWebServer()', function() {
        let p = null; // new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

        it('with default port', function () {
            p = new Project("owasp.mstg.uncrackable1", TestHelper.newConfiguration(), 1);
            p.startWebserver();

            expect(p.web).to.be.a("WebServer");
            expect(p.web.port).to.equals(TestHelper.getConfiguration().web_port);
        });

        it('with custom port', function () {
            p = new Project("owasp.mstg.uncrackable1", TestHelper.newConfiguration(), 1);
            p.startWebserver(9999);

            expect(p.web).to.be.a("WebServer");
            expect(p.web.port).to.equals(9999);
        });
    });
    */
/*
        it('using custom configuration file path', function () {
            p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 0);

            // the flag should be 1
            expect(p.nofrida).to.equals(0);

            // if Frida is disabled, the hook manager manager should be aware.
            expect(p.hook.isFridaDisabled()).to.equals(false);

            // if Frida is disabled, the Frida module should not be loaded
            expect(
                Object.keys(require.cache).indexOf('frida')>-1
            ).to.equals(true);
        });

        it('default configuration path', function () {
            p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 0);
            p.nofrida

            // the flag should be 1
            expect(p.nofrida).to.equals(0);

            // if Frida is disabled, the hook manager manager should be aware.
            expect(p.hook.isFridaDisabled()).to.equals(false);

            // if Frida is disabled, the Frida module should not be loaded
            expect(
                Object.keys(require.cache).indexOf('frida')>-1
            ).to.equals(true);
        });

        it('default configuration path', function () {
            p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 0);
            p.nofrida

            // the flag should be 1
            expect(p.nofrida).to.equals(0);

            // if Frida is disabled, the hook manager manager should be aware.
            expect(p.hook.isFridaDisabled()).to.equals(false);

            // if Frida is disabled, the Frida module should not be loaded
            expect(
                Object.keys(require.cache).indexOf('frida')>-1
            ).to.equals(true);
        });

        it('application analyzer', function () {
            p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

            expect(conf.encoding).to.equals("utf8");
            expect(conf.workspacePath).to.equals( "/home/dexcalibur/workspace/");
            expect(conf.invalid_ppt).to.equals(undefined);
        });
    });

    describe('new - frida status', function() {
        let p = null; // new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

        it('frida disabled', function () {
            p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

            // the flag should be 1
            expect(p.nofrida).to.equals(1);

            // if Frida is disabled, the hook manager manager should be aware.
            expect(p.hook.isFridaDisabled()).to.equals(true);

            // if Frida is disabled, the Frida module should not be loaded
            expect(
                Object.keys(require.cache).indexOf('frida')>-1
            ).to.equals(false);
        });

        it('frida enabled', function () {
            p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 0);

            // the flag should be 1
            expect(p.nofrida).to.equals(0);

            // if Frida is disabled, the hook manager manager should be aware.
            expect(p.hook.isFridaDisabled()).to.equals(false);

            // if Frida is disabled, the Frida module should not be loaded
            expect(
                Object.keys(require.cache).indexOf('frida')>-1
            ).to.equals(true);
        });

    });


    describe('configureation init', function() {
        var p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

        
        
    });

    describe('scan android', function() {
        var p = new Project("owasp.mstg.uncrackable1", TEST_CONFIG, 1);

        p.useAPI(p.config.platform_target);

    });*/
});