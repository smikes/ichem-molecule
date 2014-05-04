require('should');
var Molecule = require('../lib/molecule.js');

describe('Molecule', function () {
    it('should have a class Molecule', function () {
        (Molecule).should.be.a.Function;


    });

    describe('should have methods', function () {
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
});
