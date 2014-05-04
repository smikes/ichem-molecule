/* molecule.js
 * Copyright 2014 Cubane Canada, Inc.
 *
 * Released under the MIT license -- see MIT-LICENSE for details
 */

(function () {
    'use strict';

    /**
     @class Molecule
     @module iChem-Molecule
     */
    var util = require('util'),
        Molecule;

    Molecule = function () {
        this.atoms = [];
        this.bonds = [];
    };

    /**
     Add an atom to the molecule

     @method addAtom
     @param {String} elname Name of element
     */
    Molecule.prototype.addAtom = function (atom) {
        var self = this;

        if (typeof atom === 'string') {
            atom = {elname: atom};
        }

        self.atoms.push(atom);
    };

    /**
     Number of atoms in this molecule

     @method atomCount
     @return {Number}
     */
    Molecule.prototype.atomCount = function () {
        var self = this;

        return self.atoms.length;
    };

    /**
     Add a bond to the molecule

     @method addBond
     @param {Number} from Source atom
     @param {Number} to   Target atom
     */
    Molecule.prototype.addBond = function (from, to, order, stereo) {
        var lastAtom = this.atoms.length - 1;

        if ((from < 0) || (from > lastAtom)) {
            throw new RangeError(util.format('addBond: index "from" (%d) out of range (0..%d)',
                                             from, lastAtom));
        }
        if ((to < 0) || (to > lastAtom)) {
            throw new RangeError(util.format('addBond: index "to" (%d) out of range (0..%d)',
                                             from, lastAtom));
        }

        this.addBond_internal(from, to, order, stereo);
    };

    /**
     Add a bond to the molecule (skips range-checking)

     @method addBond_internal
     @private
     @param {Number} from Source atom
     @param {Number} to   Target atom
     @param {Number} order Bond Order
     */
    Molecule.prototype.addBond_internal = function addBond_internal(from, to, order, stereo) {
        order = order || 1;
        stereo = stereo || 0;

        this.bonds.push({from: from, to: to, order: order, stereo: stereo});
    };

    function addInchiMethods(inchi) {
        require('./inchi-methods.js')(Molecule, inchi.inchilib);
    };

    var extensions = {
        'inchi': addInchiMethods
    };

    Object.keys(extensions).forEach(function(key) {
        try {
            var ext = require(key);
            extensions[key](ext);
        } catch (er) {
        }
    });

    module.exports = Molecule;
})();
