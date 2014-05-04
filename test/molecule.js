require('should');
var Molecule = require('../lib/molecule.js');

describe('Molecule', function () {
    it('should have a class Molecule', function () {
        (Molecule).should.be.a.Function;


    });

    describe('should have methods', function () {
        describe('addAtom', function () {
            it('should have an addAtom method', function () {
                var m = new Molecule();

                m.addAtom('C');
                (m.atoms[0]).should.have.property('elname', 'C');
            });
            it('addAtom should take an object, too', function () {
                var m = new Molecule(),
                    atom = { elname: 'O' };

                m.addAtom(atom);
                (m.atoms[0]).should.equal(atom);
            });
        });

        describe('atomCount', function () {
            it('should have an atomCount method', function () {
                var m = new Molecule();

                (m.atomCount()).should.equal(0);
            });
        });

        describe('addBond', function () {
            it('should have an addBond method', function () {
                var m = new Molecule();

                m.addAtom('C');
                m.addAtom('O');
                m.addBond(0, 1);

                (m.bonds.length).should.be.exactly(1);
            });
            it('should record default order of 1 for bonds', function () {
                var m = new Molecule();

                m.addAtom({elname: 'C'});
                m.addAtom({elname: 'O'});
                m.addBond(0, 1);

                (m.bonds[0]).order.should.be.exactly(1);
            });
            it('should record order for bonds', function () {
                var m = new Molecule();

                m.addAtom({elname: 'C'});
                m.addAtom({elname: 'O'});
                m.addBond(0, 1, 2);

                (m.bonds[0]).order.should.be.exactly(2);
            });
            it('should complain about bonds between nonexistent atoms', function () {
                var m = new Molecule();

                m.addAtom('C');
                m.addAtom('C');

                (function () { m.addBond(1, 2); }).should.throw(/out of range/);
                (function () { m.addBond(2, 1); }).should.throw(/out of range/);
            });
        });
    });
});
