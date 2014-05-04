require('should');
var inchi_methods = require('../lib/inchi-methods.js');

describe('inchi_methods', function () {
    it('should be a function', function () {
        (inchi_methods).should.be.a.Function;
    });

    var lib = {},
        Thing = function () {};
    Thing.prototype.addBond_internal = function () {};


    it('should extend a base object', function () {

        inchi_methods(Thing, lib);

        (Thing.fromInchi).should.be.a.Function;
        (Thing.prototype.getInchi).should.be.a.Function;
    });

    describe('getInchi', function () {

        var outCalled = 0;
        lib.GetInChIFromMolecule = function (mol, callback) {
            outCalled += 1;
            callback(null, {});
        };

        it('should delegate to lib', function (done) {

            var t = new Thing();
            var cbCalled = 0;

            var callback = function () {
                cbCalled += 1;

                outCalled.should.equal(1);
                cbCalled.should.equal(1);

                done();
            };

            t.getInchi(callback);

        });
    });

    describe('fromInchi', function () {

        var outCalled = 0,
            input = 'foo';

        lib.GetStructFromINCHI = function GetStruct_mock(i, callback) {
            outCalled += 1;

            i.should.equal(input);

            callback(null, {
                atom: [
                    {elname: 'C',
                        bonds: [
                            {neighbor: 1, bond_type: 1}
                        ]
                    },
                    {
                        elname: 'C',
                        bonds: [
                            {neighbor: 0, bond_type: 1}
                        ]
                    }
                ],
                stereo0D: []
            });
        };

        it('should delegate to lib', function (done) {
            var cbCalled = 0;

            var callback = function () {
                cbCalled += 1;

                outCalled.should.equal(1);
                cbCalled.should.equal(1);

                done();
            };

            Thing.fromInchi(input, callback);
        });

        it('should deal with errors', function (done) {
            var cbCalled = 0,
                errorMessage = 'Error';

            var callback = function errorCallback(err) {
                cbCalled += 1;

                outCalled.should.equal(1);
                cbCalled.should.equal(1);
                err.should.equal(errorMessage);

                done();
            };

            lib.GetStructFromINCHI = function (i, callback) {
                callback(errorMessage);
            };

            Thing.fromInchi(input, callback);
        });

    });
});
